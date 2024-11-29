interface TableProps {
  headers: string[];
  data: { [key: string]: React.ReactNode }[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row, idx) => (
            <tr key={idx} className="border-b last:border-b-0 hover:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 text-sm text-gray-700">
                  <div className="whitespace-normal">{row[header]}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
