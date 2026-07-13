import { Redirect } from 'expo-router';

// The sell tab button in _layout.tsx triggers the create-listing modal directly.
// This screen exists only to satisfy the file-based router.
export default function SellTab() {
  return <Redirect href="/modal/create-listing" />;
}
