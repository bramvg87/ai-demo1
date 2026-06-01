import { Download } from 'lucide-react';

interface FileChipProps {
  filename: string;
  label?: string;
}

export function FileChip({ filename, label }: FileChipProps) {
  return (
    <a
      href={`/demo-files/${filename}`}
      download={filename}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-btn border border-gb-line bg-gb-soft text-gb-navy text-sm font-mono hover:border-gb-blue hover:bg-gb-soft/80 transition-colors group"
    >
      <Download className="w-3.5 h-3.5 text-gb-blue group-hover:text-gb-blue-bright transition-colors" />
      {label ?? filename}
    </a>
  );
}
