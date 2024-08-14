import { useContext } from "react";
import KioskContext from "../context/KioskProvider";

const useKiosk = () => useContext(KioskContext);

export default useKiosk;
