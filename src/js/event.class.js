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
		$('#calendar').fullCalendar('addEventSource', this.events);
	}

	remove(id)
	{
		$('#calendar').fullCalendar('removeEvents', id);
	}

	update(elements, calEvent)
	{
		if(this.verifyContent(elements))
		{
			var start_moment = $.fullCalendar.moment(elements['task-date-start'].value + 'T' + elements['task-schedule-start'].value);
			var end_moment = $.fullCalendar.moment(elements['task-date-end'].value + 'T' + elements['task-schedule-end'].value);

			calEvent.title = elements['task-title'].value;
			calEvent.start = start_moment;
			calEvent.end = end_moment;
			// calEvent.start = elements['task-date-start'].value + 'T' + elements['task-schedule-start'].value;
			// calEvent.end = elements['task-date-end'].value + 'T' + elements['task-schedule-end'].value;
			$('#calendar').fullCalendar('updateEvent', calEvent);
		}
		else
		{
			console.error("error");
		}

	}
}
