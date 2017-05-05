class CalendarManager
{
	constructor()
	{
		this._eventsSource = [];
		console.log('New calendar manager');
	}
	set eventsSource(eventsSource){this._eventsSource = eventsSource;}
	get eventsSource(){return this._eventsSource;}
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
		$('#calendar').fullCalendar('addEventSource',
			[
				{
		            title  : 'event1',
		            start  : '2017-05-05'
		        }
			]
		);
	}

	onDayClick(e)
	{
		console.log('dayclick', e._d);
		
		// $('#calendar').fullCalendar('addEventSource',
		// 	[
		// 		{
		// 			title  : 'event1',
		// 			start  : e._d
		// 		}
		// 	]
		// );
	}
}

(() => {
	console.log('init');

	let calman = new CalendarManager();
	calman.init();
})();
