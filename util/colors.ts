export const getColorByKey = (key: string): string => {
  let hexColor = "#a6adc8";

  switch (key) {
    case "Object Oriented Programming":
      hexColor = "#f2cdcd";
      break;
    case "Computers and Society":
      hexColor = "#f5c2e7";
      break;
    case "Computer Architecture":
      hexColor = "#b4befe";
      break;
    case "Numerical Methods":
      hexColor = "#a6e3a1";
      break;
    case "Ethics":
      hexColor = "#f9e2af";
      break;
    case "work":
      hexColor = "#f38ba8";
      break;
    case "icebreak":
      hexColor = "#fab387";
      break;
    case "personal":
      hexColor = "#74c7ec";
      break;
    case "school":
      hexColor = "#94e2d5";
      break;
  }

  return hexColor;
};
