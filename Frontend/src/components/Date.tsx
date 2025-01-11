export function DateInput({date, setDate}) {
    return (

        <div className="mb-4">
            <label className="block text-gray-600 mb-2">Date</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}