import figlet from "figlet";
import gradient from "gradient-string";

export default function banner() {
  console.log(
    gradient.pastel.multiline(
      figlet.textSync("GBIT START", {
        horizontalLayout: "default",
      })
    )
  );

  console.log(gradient.atlas("\nOpen any project in seconds\n"));
}
