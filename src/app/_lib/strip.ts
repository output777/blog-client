export default function stripHtmlTags(html: string) {
  return html.replace(/<[^>]+>/g, '');
}
