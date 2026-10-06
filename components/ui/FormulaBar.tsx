import { FunctionSquare } from "lucide-react";

/** Barra de fórmula de la hoja: casilla de nombre, ƒx y el contenido de la celda activa. */
export function FormulaBar({ cellRef, formula }: { cellRef: string; formula: string }) {
  return (
    <div aria-hidden className="flex items-stretch border-b border-grid text-[0.85rem]">
      <span className="flex w-16 shrink-0 items-center justify-center border-r border-grid font-semibold text-ink sm:w-20">{cellRef}</span>
      <span className="flex items-center border-r border-grid px-2.5 text-band-ink">
        <FunctionSquare size={16} />
      </span>
      <span className="min-w-0 flex-1 truncate px-3 py-2 text-ink-soft">{formula}</span>
    </div>
  );
}
