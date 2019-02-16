function Accordion(options)
{
	this.container = options.container;
	this.mainTitle = options.mainTitle;
	this.panels    = options.panels;
}

Accordion.prototype.start = function()
{
	var target = document.getElementById(this.container)
		panels_n = this.panels.length;

	if(this.mainTitle)
	{
		var main_title = document.createElement('h1');
		main_title.className = 'accordion-main-title';
		main_title.innerHTML = this.mainTitle;
		target.appendChild(main_title);
	}

	if(this.panels.length > 0)
	{
		var panels_wrapper = document.createElement('div');
		panels_wrapper.className = 'panels-wrapper';

		this.panels.forEach(function(panel, index)
		{
			var item       = document.createElement('div');
			item.className = 'panel';

			var expand = document.createElement('i');
			expand.className = 'material-icons';
			expand.innerHTML = 'expand_more';
			item.appendChild(expand);

			var title       = document.createElement('h2');
			title.className = 'panel-title';
			title.innerHTML = panel.title;
			item.appendChild(title);

			if(panel.subtitle)
			{
				var subtitle       = document.createElement('h3');
				subtitle.className = 'panel-subtitle';
				subtitle.innerHTML = panel.subtitle;
				item.appendChild(subtitle);
			}

			var panel_content = document.createElement('div');
				panel_content.className = 'panel-content';

			var doc           = new DOMParser(),
				nodes         = doc.parseFromString(panel.content, 'text/html'),
				nodes       = nodes.body.childNodes;

			// Converto i nodi in array
			let content = Array.from(nodes);

			content.forEach(function(item)
			{
				panel_content.appendChild(item);
			});

			item.appendChild(panel_content);

			item.addEventListener("click", function()
			{
				let elements = panels_wrapper.children;

				for(let i = 0; i < elements.length; i++)
				{
					var arrow = this.getElementsByTagName("i")[0];

					if(this === elements[i])
					{
						this.classList.toggle("active")
					}

					else
					{
						elements[i].classList.remove('active');
						elements[i].getElementsByTagName("i")[0].innerHTML = "expand_more";
					}
				}
			});

			panels_wrapper.appendChild(item);
		 });
	}

	target.appendChild(panels_wrapper);
}