class CalendarManager
{
	constructor()
	{
		this._eventsSource = [];
		console.log('New calendar manager');
	}
	set eventsSource(eventsSource)
	{
		this._eventsSource = eventsSource;
	}
	get eventsSource()
	{
		return this._eventsSource;
	}
	init()
	{
		$('#calendar').fullCalendar(
		{
			customButtons:
			{
				addEventButton:
				{
					text: 'Ajouter une tâche',
					click: this.addEvent
				}
			},
			dayClick: this.onDayClick,
			header:
			{
				left: 'prev,next, today, addEventButton',
		        center: 'title',
		        right: 'month,agendaWeek,agendaDay',
			},

			views: {
				agenda: {
					minTime: "06:00:00",
					maxTime: "22:00:00",
					columnFormat: 'dddd',
					slotDuration: '1:00',
					slotLabelFormat: 'H:mm',
					allDaySlot: false
				},
				month: {
					columnFormat: 'dddd'
				},
				agendaCustomDay: {

					type: 'agenda',
					buttonText: 'Jour'
				}
			}
		});
	}

	addEvent()
	{
		console.log("dede");
		// $('#calendar').fullCalendar('addEventSource',
		// 	[
		// 		{
		//             title  : 'event1',
		//             start  : '2017-05-05'
		//         }
		// 	]
		// );
	}

	onDayClick(e)
	{
		console.log('dayclick', e._d);
		// UIkit.modal.dialog('<p>Titre</p><button>Valider</button>');
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
