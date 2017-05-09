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

	customRefetch() // search an other solution 
	{
		$('#calendar').fullCalendar('removeEventSources');
	}
	remove()
	{

	}

	update()
	{

	}
}
