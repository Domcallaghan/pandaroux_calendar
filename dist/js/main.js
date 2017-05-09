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
				console.log(calEvent);
				console.log(jsEvent);
				console.log(view);
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
			this.eventManager.create($('#modal-event-data')[0].elements);
			modalObject.hide();
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
			modalObject.hide();
		});
	}


}

class EventManager
{
	constructor()
	{
		console.log("new Event manager");
		this.events = [];
	}

	create(elements)
	{
		if(this.verifyContent(elements))
		{
			let newEvent = {
				title: elements['task-title'].value,
				start: elements['task-date-start'].value + 'T' + elements['task-schedule-start'].value,
				end: elements['task-date-end'].value + 'T' + elements['task-schedule-end'].value,
				editable: true
			}
			this.events.push(newEvent);
			this.customRefetch();
			$('#calendar').fullCalendar('addEventSource', this.events);
		}
		else
		{
			UIkit.notification(
			{
				message: 'Erreur',
				status: 'danger',
				pos: 'top-center',
				timeout: 1000
			});
		}
	}

	verifyContent(elements)
	{
		if(!elements['task-title'].value == "" &&
			!elements['task-date-start'].value == "" &&
			!elements['task-date-end'].value == "" &&
			!elements['task-schedule-start'].value == "" &&
			!elements['task-schedule-end'].value == "")
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	// search an other solution for this function
	customRefetch()
	{
		$('#calendar').fullCalendar('removeEventSources');
	}

	remove(id)
	{
		$('#calendar').fullCalendar('removeEvents', id);
	}

	update(elements, calEvent)
	{
		console.log(calEvent.start);
		calEvent.title = elements['task-title'].value;

		$('#calendar').fullCalendar('updateEvent', calEvent);
	}
}

(() => {
	console.log('init');

	let calman = new CalendarManager();
	calman.init();
})();
