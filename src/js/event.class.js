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
		// console.log(elements['task-schedule-start'].value) // check if fill or not
		let newEvent = {
			title: elements['task-title'].value,
			start: elements['task-date-start'].value,
			editable: true
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
