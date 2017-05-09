class CalendarManager
{
	constructor()
	{
		console.log('New calendar manager');
		this.eventManager = new EventManager();
		this.modalTemp = $('#modal-template').html();
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
					click: () => {this.launchEventModal()} // Beware of arrow and this
				}
			},
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

	launchEventModal()
	{
		var data = UIkit.modal.dialog(this.modalTemp); // check if data empty
		$('#modal-event-submit-button').on('click', (e) => {
			e.preventDefault();
			this.eventManager.create($('#modal-event-data')[0].elements);
		});
	}


}
