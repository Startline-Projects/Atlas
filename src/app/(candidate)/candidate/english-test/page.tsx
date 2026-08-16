/**
 * /candidate/english-test
 *
 * The interactive short-form English assessment (prototype). Intro →
 * questions → hands off to /candidate/english-test/result with the
 * computed score. Serves both the free first attempt and paid
 * retakes — the checkout success screen links back here.
 */
import { TestRunner } from "@/components/candidate/english-test/test-runner";

export default function EnglishTestPage() {
  return <TestRunner />;
}
