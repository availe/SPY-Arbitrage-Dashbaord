const MdxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mdx-layout-container">
      <div className="markdown-body">{children}</div>
    </div>
  );
};

export default MdxLayout;