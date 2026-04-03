export default function Quote (
    {text, image} : {text: string, image: string}
)
{
    return (
        <div className="flex-1 bg-white rounded-2xl select-none flex flex-col justify-between">
            <p className="p-2 text-black font-black">
                &laquo; {text} &raquo;
            </p>
            <img src={image} alt="tide" className="rounded-b-2xl self-end"  />
        </div>
    )
}