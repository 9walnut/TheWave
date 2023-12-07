import "./PageName.css";

function PageName(props) {
  return (
    <>
      <div className="pageName">{props.children}</div>
    </>
  );
}

export default PageName;
