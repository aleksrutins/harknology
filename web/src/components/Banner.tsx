import Image from "next/image";
import banner from "@res:banner.svg";

export default function Banner() {
    return <Image src={banner} height={128} alt="Harknology"/>
}