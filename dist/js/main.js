class CalendarManager
{
	constructor()
	{
		console.log('New calendar manager');
	}

	init()
	{
		$('#calendar').fullCalendar({
			customButtons: {
				addEventButton: {
					text: 'Add event',
					click: this.addEvent
				}
			},
			dayClick: this.onDayClick,
			header: {
				left: 'prev,next, today, addEventButton',
		        center: 'title',
		        right: 'month,agendaWeek,agendaDay'
			}
		});
	}

	addEvent()
	{
		console.log("dede");
	}

	onDayClick(e)
	{
		console.log('dayclick', e);
	}
}

(() => {
	console.log('init');

	let calman = new CalendarManager();
	calman.init();
})();
