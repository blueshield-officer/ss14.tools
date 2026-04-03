export default function Temperature(
    {min, max} : {min: number | null, max: number | null}
) {
    return (
        <p>From {min} to {max}</p>
    )
}