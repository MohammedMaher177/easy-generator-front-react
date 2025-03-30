import { Card, CardContent, CardHeader } from "../UI/card";
import { useTodoReport } from "@/hooks/useTodoReport";
import { useEffect, memo } from "react";
import Loading from "../Loading/Loading";
import ErrorState from "../ErrorState";
import DataGrid from "../DataGrid";

const SECTION_TITLES = {
  category: {
    title: "All Todos by Category",
    subtitle: "Demographic properties of your Categories",
  },
  priority: {
    title: "All Todos by Priority",
    subtitle: "Demographic properties of your Priorities",
  },
};

type SectionHeaderProps = {
  title: string;
  subtitle: string;
};

const SectionHeader = memo(({ title, subtitle }: SectionHeaderProps) => (
  <CardHeader className="border-none pb-0">
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-default-900 whitespace-nowrap">
          {title}
        </h2>
        <span className="text-xs text-default-600">{subtitle}</span>
      </div>
    </div>
  </CardHeader>
));

const ReportsSnapshot = () => {
  const { report, loading, error, fetchReport } = useTodoReport();

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorState message={error} />;
  if (!report)
    return <p className="text-default-500 p-4">No report data available.</p>;

  return (
    <Card className="w-full shadow-sm">
      <SectionHeader
        title={SECTION_TITLES.category.title}
        subtitle={SECTION_TITLES.category.subtitle}
      />
      <CardContent className="p-4 md:p-5 w-full">
        <DataGrid
          data={report.byCategory}
          itemKeyPrefix="category"
          itemLabelKey="category"
        />
      </CardContent>

      <SectionHeader
        title={SECTION_TITLES.priority.title}
        subtitle={SECTION_TITLES.priority.subtitle}
      />
      <CardContent className="p-4 md:p-5 w-full">
        <DataGrid
          data={report.byPriority}
          itemKeyPrefix="priority"
          itemLabelKey="priority"
        />
      </CardContent>
    </Card>
  );
};

export default memo(ReportsSnapshot);
