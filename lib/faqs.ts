// FAQs in content files are numbered lists: `1. **Question?** Answer`.
export function extractFaqs(
  body: string,
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  for (const line of body.split("\n")) {
    const m = line.match(/^\d+\.\s*\*\*(.+?)\*\*\s*(.+)$/);
    if (m)
      faqs.push({
        question: m[1].replace(/\*\*/g, "").trim(),
        answer: m[2].trim(),
      });
  }
  return faqs;
}
