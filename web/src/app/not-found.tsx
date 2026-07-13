import { SearchX } from "lucide-react";
import { ButtonLink, EmptyState } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-20">
      <EmptyState
        icon={<SearchX size={26} aria-hidden="true" />}
        title="This page has been sold"
        body="Or it never existed. Either way, there's plenty more where that came from."
        action={
          <ButtonLink href="/" variant="primary" size="sm">
            Back to Hala
          </ButtonLink>
        }
      />
    </div>
  );
}
