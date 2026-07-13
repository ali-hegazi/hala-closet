"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, MessageCircle, Send, Tag, X } from "lucide-react";
import { getListing, getSeller } from "@/lib/data";
import { SEED_CONVERSATIONS } from "@/lib/conversations";
import type { Conversation, Message } from "@/lib/types";
import { formatAED } from "@/lib/format";
import { Avatar, Button, ButtonLink, EmptyState, Input } from "@/components/ui";

function nowTime() {
  return new Date().toLocaleTimeString("en-AE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function OfferBubble({
  message,
  mine,
  onRespond,
}: {
  message: Message;
  mine: boolean;
  onRespond: (status: "accepted" | "declined") => void;
}) {
  const offer = message.offer!;
  return (
    <div
      className={`max-w-[75%] rounded-2xl border p-3.5 ${
        mine
          ? "ml-auto border-teal-100 bg-teal-50"
          : "border-sand-200 bg-sand-25"
      }`}
    >
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-terra-600">
        <Tag size={13} aria-hidden="true" /> Offer
      </p>
      <p className="mt-1 font-display text-xl font-semibold text-ink-900">
        {formatAED(offer.amount)}
      </p>
      {offer.status === "pending" && !mine && (
        <div className="mt-2.5 flex gap-2">
          <Button size="sm" onClick={() => onRespond("accepted")}>
            <Check size={14} aria-hidden="true" /> Accept
          </Button>
          <Button size="sm" variant="outline" onClick={() => onRespond("declined")}>
            <X size={14} aria-hidden="true" /> Decline
          </Button>
        </div>
      )}
      {offer.status === "pending" && mine && (
        <p className="mt-1 text-xs text-ink-500">Waiting for a reply…</p>
      )}
      {offer.status === "accepted" && (
        <p className="mt-1 text-xs font-semibold text-success-600">Offer accepted 🎉</p>
      )}
      {offer.status === "declined" && (
        <p className="mt-1 text-xs font-semibold text-danger-600">Offer declined</p>
      )}
    </div>
  );
}

function InboxInner() {
  const params = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>(SEED_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [offerDraft, setOfferDraft] = useState("");
  const [showOffer, setShowOffer] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Deep link from a listing page: open (or create) that conversation.
  useEffect(() => {
    const listingId = params.get("listing");
    const sellerId = params.get("seller");
    const intent = params.get("intent");
    if (!listingId && !sellerId) return;

    setConversations((prev) => {
      const listing = listingId ? getListing(listingId) : undefined;
      const seller = getSeller(sellerId ?? listing?.sellerId ?? "");
      if (!seller) return prev;
      const existing = prev.find(
        (c) => c.withHandle === seller.handle && (!listing || c.listingId === listing.id)
      );
      if (existing) {
        setActiveId(existing.id);
        return prev;
      }
      const greeting: Message[] =
        intent === "buy" && listing
          ? [
              {
                id: "new1",
                from: "me",
                text: `Hi! I'd like to buy "${listing.title}" for ${formatAED(listing.price)}. How would you like to arrange it?`,
                time: nowTime(),
              },
            ]
          : [];
      const fresh: Conversation = {
        id: `c${Date.now()}`,
        withName: seller.name,
        withHandle: seller.handle,
        listingId: listing?.id ?? "l1",
        messages: greeting,
      };
      setActiveId(fresh.id);
      if (intent === "offer") setShowOffer(true);
      return [fresh, ...prev];
    });
  }, [params]);

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [active?.messages.length]);

  function pushMessage(msg: Omit<Message, "id" | "time">) {
    if (!active) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              messages: [
                ...c.messages,
                { ...msg, id: `m${Date.now()}`, time: nowTime() },
              ],
            }
          : c
      )
    );
  }

  function respondToOffer(messageId: string, status: "accepted" | "declined") {
    if (!active) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === messageId && m.offer
                  ? { ...m, offer: { ...m.offer, status } }
                  : m
              ),
            }
          : c
      )
    );
  }

  const listing = active ? getListing(active.listingId) : undefined;

  return (
    <div className="pb-8 pt-6">
      <h1 className="mb-6 font-display text-3xl font-semibold text-ink-900">Inbox</h1>
      <div className="grid overflow-hidden rounded-3xl border border-sand-200 bg-sand-25 md:h-[640px] md:grid-cols-[300px_1fr]">
        {/* Conversation list */}
        <div
          className={`border-sand-200 md:border-r ${active ? "hidden md:block" : ""}`}
        >
          {conversations.map((c) => {
            const l = getListing(c.listingId);
            const last = c.messages[c.messages.length - 1];
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                aria-current={c.id === activeId}
                className={`flex w-full items-center gap-3 border-b border-sand-200/70 px-4 py-3.5 text-left transition-colors hover:bg-sand-100/60 ${
                  c.id === activeId ? "bg-teal-50" : ""
                }`}
              >
                <Avatar name={c.withName} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink-900">
                    {c.withName}
                  </span>
                  <span className="block truncate text-xs text-ink-500">
                    {last?.offer
                      ? `Offer · ${formatAED(last.offer.amount)}`
                      : last?.text ?? "New conversation"}
                  </span>
                </span>
                {l && (
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                    <Image src={l.images[0]} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                )}
              </button>
            );
          })}
          {conversations.length === 0 && (
            <div className="p-6">
              <EmptyState
                icon={<MessageCircle size={24} aria-hidden="true" />}
                title="No messages yet"
                body="Message a seller from any listing and the conversation will appear here."
              />
            </div>
          )}
        </div>

        {/* Thread */}
        <div className={`flex flex-col ${active ? "" : "hidden md:flex"}`}>
          {active ? (
            <>
              <div className="flex items-center gap-3 border-b border-sand-200 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="rounded-full p-1.5 text-ink-500 hover:bg-sand-100 md:hidden"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft size={18} />
                </button>
                <Avatar name={active.withName} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink-900">
                    {active.withName}
                  </p>
                  <p className="truncate text-xs text-ink-500">@{active.withHandle}</p>
                </div>
                {listing && (
                  <Link
                    href={`/listing/${listing.id}`}
                    className="flex items-center gap-2 rounded-xl bg-sand-100 px-2.5 py-1.5 text-xs font-semibold text-ink-700 hover:bg-teal-50"
                  >
                    <span className="relative size-7 overflow-hidden rounded-md">
                      <Image src={listing.images[0]} alt="" fill sizes="28px" className="object-cover" />
                    </span>
                    <span className="max-w-32 truncate">{listing.title}</span>
                    <span className="text-teal-800">{formatAED(listing.price)}</span>
                  </Link>
                )}
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto bg-sand-50/60 p-4 max-md:min-h-96">
                {active.messages.map((m) =>
                  m.offer ? (
                    <OfferBubble
                      key={m.id}
                      message={m}
                      mine={m.from === "me"}
                      onRespond={(status) => respondToOffer(m.id, status)}
                    />
                  ) : (
                    <div
                      key={m.id}
                      className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.from === "me"
                          ? "ml-auto rounded-br-md bg-teal-700 text-sand-25"
                          : "rounded-bl-md bg-sand-100 text-ink-900"
                      }`}
                    >
                      {m.text}
                      <span
                        className={`mt-1 block text-right text-[10px] ${
                          m.from === "me" ? "text-teal-100" : "text-ink-400"
                        }`}
                      >
                        {m.time}
                      </span>
                    </div>
                  )
                )}
                <div ref={bottomRef} />
              </div>

              {showOffer && (
                <form
                  className="flex items-center gap-2 border-t border-sand-200 bg-terra-100/40 px-4 py-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const amount = Number(offerDraft);
                    if (amount > 0) {
                      pushMessage({ from: "me", offer: { amount, status: "pending" } });
                      setOfferDraft("");
                      setShowOffer(false);
                    }
                  }}
                >
                  <span className="text-sm font-semibold text-terra-700">Offer AED</span>
                  <Input
                    type="number"
                    min={1}
                    value={offerDraft}
                    onChange={(e) => setOfferDraft(e.target.value)}
                    placeholder={listing ? String(Math.round(listing.price * 0.9)) : "Amount"}
                    aria-label="Offer amount in AED"
                    className="h-10 max-w-32"
                    autoFocus
                  />
                  <Button type="submit" size="sm" variant="accent">
                    Send offer
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowOffer(false)}
                  >
                    Cancel
                  </Button>
                </form>
              )}

              <form
                className="flex items-center gap-2 border-t border-sand-200 px-4 py-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (draft.trim()) {
                    pushMessage({ from: "me", text: draft.trim() });
                    setDraft("");
                  }
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowOffer((v) => !v)}
                  className="rounded-full p-2.5 text-terra-600 transition-colors hover:bg-terra-100"
                  aria-label="Make an offer"
                  title="Make an offer"
                >
                  <Tag size={18} />
                </button>
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write a message…"
                  aria-label="Message"
                  className="h-10"
                />
                <Button type="submit" size="sm" aria-label="Send message">
                  <Send size={15} aria-hidden="true" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-8">
              <EmptyState
                icon={<MessageCircle size={24} aria-hidden="true" />}
                title="Select a conversation"
                body="Chat with buyers and sellers, agree a price, and arrange delivery or a meet-up."
                action={
                  <ButtonLink href="/search" variant="outline" size="sm">
                    Find something to talk about
                  </ButtonLink>
                }
              />
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-400">
        Demo inbox — messages reset on reload. Live chat arrives with Supabase Realtime.
      </p>
    </div>
  );
}

export default function InboxPage() {
  return (
    <Suspense>
      <InboxInner />
    </Suspense>
  );
}
