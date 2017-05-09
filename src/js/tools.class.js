class Tools
{
	static getDateAndHour(data)
	{
		return data.match(/^(.{10})T(.{5})$/);
	}
}
