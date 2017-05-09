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
		var modalObject = UIkit.modal.dialog(this.modalTemp);
		$('#task-title').val(calEvent.title);

		var start_rslt = Tools.getDateAndHour(calEvent.start._i);
		var start_date = start_rslt[1];
		var start_hour = start_rslt[2];

		$('#task-date-start').val(start_date);
		$('#task-schedule-start').val(start_hour);

		var end_rslt = Tools.getDateAndHour(calEvent.end._i);
		var end_date = end_rslt[1];
		var end_hour = end_rslt[2];

		$('#task-date-end').val(end_date);
		$('#task-schedule-end').val(end_hour);


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
			return true;
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
			return false;
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
		// regexp decoupe
		// calEvent.title = elements['task-title'].value;
		//
		// $('#calendar').fullCalendar('updateEvent', calEvent);
	}
}

(() => {
	console.log('init');

	let calman = new CalendarManager();
	calman.init();
})();

class Tools
{
	static getDateAndHour(data)
	{
		return data.match(/^(.{10})T(.{5})$/);
	}
}
