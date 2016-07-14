({
	/* 	Author: Angel Magaña -- cheleguanaco@cheleguanaco.com
	*  	File: ./custom/clients/base/views/dashlet-calendar/dashlet-calendar.js
	*	
	*	Version: 1.0	
	*
	*  	Controller for graphical calendar dashlet   
	*/

	plugins: ['Dashlet'],
	
	items: [],
	
	loadData: function(){
		this.items = [];
	
		var today = app.date.format(new Date(), 'Y-m-d'),
			activity = this.settings.attributes.activity;
		
		if (activity === 'CallsMeetings')
		{
			activity = ['Calls', 'Meetings'];
		}
		else
		{
			activity = [activity];
		}

		//var calDate = this.$('#calendar').fullCalendar('getDate');
		
		//this.$('#calendar').fullCalendar('getDate');
		//selectedDate.format('YYYY-MM-DD');
		
		_.each(activity, function(type){
			var calItems = app.data.createBeanCollection(type),
				self = this;
			
			calItems.fetch({
				params:{filter:[{'date_start':today}]},
				success: function(){
					self.handleData(calItems.models);
				},
			});			
		}, this);
	},
	
	handleData: function(calEvents){
		var self = this;
		
		_.each(calEvents, function(calEvent){ 
			//Set color on activity based on module
			var module = calEvent.get('_module'),
				color = '';
			
			if (module === 'Meetings')
			{
				color = 'blue';
			}
			else
			{
				color = 'red';
			}
			
			self.items[self.items.length] = {
				title: calEvent.get('name'),
				start: calEvent.get('date_start'),
				color: color,
				allDay: false,
				url: '#bwc/index.php?action=DetailView&module=' + module + '&record=' + calEvent.id
			};
		});
		
		self.render();
	},

	render: function(){
		this._super('render');
		
		this.$('#calendar').fullCalendar({
				//timezone: app.user.getPreference('timezone'),
        		defaultView: 'agendaDay', 
        		events: this.items,
        		//lang: 'es',
				businessHours: {
									start: '08:00', 
									end: '18:00', 
								},
				/* 
				eventClick: function(calEvent, jsEvent, view){
					console.log(calEvent);
				},
				*/
				dayClick: function(date, jsEvent, view){
					/*
					var tz = app.user.getPreference('timezone'),
						tzo = app.user.getPreference('tz_offset');
					
					date.utcOffset(tzo);
					date.zone = tz;
					*/
					
					var dateTimeFormat = app.user.getPreference('datepref') + ' ' + app.user.getPreference('timepref'),
						start = (parseInt(date.get('Month')) + 1) + '/' + date.get('Date') + '/' + date.get('Year'),
						h = parseInt(date.get('hours')),
						m = parseInt(date.get('minutes')),
						mer = 'pm';
					
					if (h < 12)
					{
						mer = 'am';
					}

					if (h > 12)
					{
						h = h - 12;
					}
					
					if (h < 10)
					{
						h = '0' + h;
					} 
		
					start += ' ' + h + ':' + m + ':00' + mer;
					start = encodeURIComponent(start);
					
					//var addURL = '#bwc/index.php?module=Calls&action=EditView&date_start=' + start;
					//app.router.navigate(addURL, {trigger: true});
					app.drawer.open({
						layout: 'create',
						context:{
							create:true,
							model:app.data.createBean('Meetings'),
							module: 'Meetings'
						}
					});
				},
    	});    	
	},
	
	_dispose: function(){
		this._super('_dispose');
	}
})