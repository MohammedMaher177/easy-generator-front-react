import linePic from "@/assets/images/line.png";

type Props = {};

export default function LinePic({}: Props) {
    return (
        <div className={`mb-2 w-full`}>
            <img className={`w-[90%]`} src={linePic} alt="linePic" />
            {/* <img className={`w-[90%]`} src="assets/images/line.png" alt="linePic" /> */}
        </div>
    );
}
