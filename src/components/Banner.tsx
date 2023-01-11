import Image from "next/image";
import banner from "@res:banner.svg";

export default function Banner() {
    return <Image src={banner} width={500} height={128} alt="Harknology" className="text-center block" style={{margin: "auto"}}/>
}