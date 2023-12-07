import "./Button.css";

function Button(props) {
  return (
    <>
      <div>
        <button className="pageBtn">{props.children}</button>
      </div>
    </>
  );
}

export default Button;
