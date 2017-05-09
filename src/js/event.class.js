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
			let newEvent =
			{
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
			UIkit.notification({
			    message: 'Error',
			    status: 'primary',
			    pos: 'top-right',
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
