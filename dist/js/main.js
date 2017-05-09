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

	launchEventCreateModal()
	{
		UIkit.modal.dialog(this.modalTemp); // check if data empty
		$('#modal-event-submit-button').on('click', (e) => {
			e.preventDefault();
			this.eventManager.create($('#modal-event-data')[0].elements);
		});
	}

	launchEventUpdateModal(calEvent)
	{
		console.log("update the event");
		UIkit.modal.dialog(this.modalTemp);
		$('#task-title').val(calEvent.title);
		$('#modal-event-submit-button').on('click', (e) => {
			e.preventDefault();
			this.eventManager.update($('#modal-event-data')[0].elements, calEvent);
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

		// console.log("moment");
		console.log(elements['task-title'].value); //object
		console.log(elements['task-date-start'].value); //object

		let newEvent = {
			title: elements['task-title'].value,
			start: elements['task-date-start'].value
		};

		this.events.push(newEvent);
		this.customRefetch();
		$('#calendar').fullCalendar('addEventSource', this.events);
	}

	// search an other solution for this function
	customRefetch()
	{
		$('#calendar').fullCalendar('removeEventSources');
	}
	remove()
	{

	}

	update(elements, calEvent)
	{
		calEvent.title = elements['task-title'].value;
		calEvent.start = elements['task-date-start'].value;

		$('#calendar').fullCalendar('updateEvent', calEvent);
	}
}

(() => {
	console.log('init');

	let calman = new CalendarManager();
	calman.init();
})();
