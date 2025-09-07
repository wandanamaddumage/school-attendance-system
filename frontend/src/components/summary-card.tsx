export function SummaryCard({
    label,
    value,
    color,
  }: {
    label: string;
    value: string | number;
    color?: string;
  }) {
    return (
      <div className="text-center p-4 bg-muted rounded-lg">
        <p className={`text-2xl font-bold ${color ? `text-${color}` : ""}`}>{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    );
  }
  