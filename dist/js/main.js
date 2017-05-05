class CalendarManager
{
	constructor()
	{
		console.log('New calendar manager');
	}

	init()
	{
		$('#calendar').fullCalendar({});
	}
}

(() => {
	console.log('init');

	let calman = new CalendarManager();
	calman.init();
})();
