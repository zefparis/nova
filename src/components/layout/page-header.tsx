export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h1 className="text-lg font-semibold tracking-tight md:text-xl">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground md:text-sm">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
