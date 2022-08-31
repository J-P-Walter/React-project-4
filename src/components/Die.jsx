function Die(props) {
  //Dynamically styles die if "held", changes background color
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div className="die-face" style={styles} onClick={props.hold}>
      <h2>{props.value}</h2>
    </div>
  );
}
export default Die;
