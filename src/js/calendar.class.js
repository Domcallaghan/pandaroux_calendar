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
					click: () => {this.launchEventCreateModal()} // Beware of arrow and this
				}
			},
			eventClick: (calEvent, jsEvent, view) => {
				this.launchEventUpdateModal(calEvent);
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
					allDaySlot: true
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

	launchEventCreateModal()
	{
		var modalObject = UIkit.modal.dialog(this.modalTemp); // check if data empty
		console.log(modalObject);
		$('#modal-event-submit-button').on('click', (e) => {
			e.preventDefault();
			if(this.eventManager.create($('#modal-event-data')[0].elements))
			{
				modalObject.hide();
			}
		});
	}

	launchEventUpdateModal(calEvent)
	{
		console.log("update the event");
		var modalObject = UIkit.modal.dialog(this.modalTemp);
		$('#task-title').val(calEvent.title);
		$('#task-date-start').val(calEvent.start._i);
		$('#modal-event-submit-button').on('click', (e) => {
			e.preventDefault();
			this.eventManager.update($('#modal-event-data')[0].elements, calEvent);
			// modalObject.hide();
		});
	}


}
