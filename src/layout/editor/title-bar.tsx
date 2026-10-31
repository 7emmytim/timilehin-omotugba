export function TitleBar() {
  return (
    <div className="flex h-[38px] items-center gap-[10px] border-b border-hair bg-title px-3 text-xs text-mute">
      <span className="flex flex-none gap-2" aria-hidden="true">
        <i className="block h-3 w-3 rounded-full bg-[#ff5f57]" />
        <i className="block h-3 w-3 rounded-full bg-[#febc2e]" />
        <i className="block h-3 w-3 rounded-full bg-[#28c840]" />
      </span>

      <span className="hidden flex-1 items-center justify-center truncate font-mono md:flex">
        timilehin.ts / timilehin-omotugba
      </span>

      {/* Balances the traffic lights so the title stays centred. The view
          switch floats in the corner now. */}
      <span aria-hidden="true" className="hidden w-[52px] flex-none md:block" />
    </div>
  );
}
