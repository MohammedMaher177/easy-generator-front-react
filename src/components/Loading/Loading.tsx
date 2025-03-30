import { Spinner } from "@radix-ui/themes"


type Props = {}

export default function Loading({ }: Props) {
    return (
        <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
            <h1>LOADING .....</h1>
        </div>
    )
}
