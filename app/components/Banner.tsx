import Image from "next/image";
import banner from "@res:banner.png";

export default function Banner() {
    return <Image src={banner} width={500} alt="Harknology" className="text-center block" style={{margin: "auto"}}/>
}