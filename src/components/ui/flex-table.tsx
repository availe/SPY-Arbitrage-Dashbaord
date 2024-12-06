import ReactMarkdown from "react-markdown";

interface TableProps {
  headers: string[];
  data: { [key: string]: string }[];
}

const FlexTable: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="flex flex-col my-8 w-full">
      {/* Table Header */}
      <div className="flex w-full bg-[#F6F8FA] text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200">
        {headers.map((header) => (
          <div key={header} className="flex-1 px-4 py-2">
            {header}
          </div>
        ))}
      </div>

      {/* Table Rows */}
      <div className="flex flex-col bg-white">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex w-full border-b last:border-b-0 hover:bg-[#F6F8FA] ${
              rowIndex % 2 === 1 ? "bg-[#F6F8FA]" : ""
            }`}
          >
            {headers.map((header) => (
              <div
                key={header}
                className="flex-1 px-4 py-2 text-sm text-gray-700 break-words"
              >
                <ReactMarkdown>{row[header]}</ReactMarkdown>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexTable;
