class CalendarManager
{
	constructor()
	{
		console.log('New calendar manager');
		this.eventManager = new EventManager();
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
					click: () => {this.addEvent()} // Beware of arrow and this
				}
			},
			dayClick: (e) => {this.onDayClick(e)},
			timezone: 'local',
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
		this.eventManager.create();
		// var moment = $('#calendar').fullCalendar('getDate');
		// console.log(moment);
		// this._eventManager.add(moment);
	}

	onDayClick(e)
	{
		console.log('dayclick', e._d);
		this.eventManager.create(e);
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
