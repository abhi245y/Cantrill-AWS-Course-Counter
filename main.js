function calculateRemaningTime(mainSelector){
    let remaningSeconds = 0;
    mainSelector.querySelectorAll('.incomplete').forEach((incomplete) => {
      var lessonName = incomplete.querySelector('.lecture-name').textContent;
      var match = lessonName.match(/\((\d{1,2}:\d{2})\)\s*$/);
      if (match) {
        let duration = match[1];
        let [minutes, seconds] = duration.split(':').map(Number);
        remaningSeconds += minutes * 60 + seconds;
      }
    });
  
    let hours = Math.floor(remaningSeconds / 3600);
    remaningSeconds %= 3600;
    let minutes = Math.floor(remaningSeconds / 60);
    let seconds = remaningSeconds % 60;
  
  
    return {hours,minutes,seconds}
  }
  
  document.querySelectorAll('.course-section').forEach((main) => {
      var title = main.querySelector('.section-title');
      let totalSeconds = 0;
      var lessonsArray = [];
      main.querySelectorAll('.lecture-name').forEach((lessonslist) => {
        lessonsArray.push(lessonslist);
    
        var lessonName = lessonslist.textContent;
        var match = lessonName.match(/\((\d{1,2}:\d{2})\)\s*$/);
        if (match) {
          let duration = match[1];
          let [minutes, seconds] = duration.split(':').map(Number);
          totalSeconds += minutes * 60 + seconds;
        }
      });
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      var remainingTime = calculateRemaningTime(main);
      var totalLessonsMessage;
      if (hours !== 0) {
        totalLessonsMessage = `Total: ${lessonsArray.length.toString()} lessons.<br>Total Duration: ${hours} hours, ${minutes} minutes, ${seconds} seconds.`;
      } else {
        totalLessonsMessage = `Total: ${lessonsArray.length.toString()} lessons.<br>Total Duration: ${minutes} minutes, ${seconds} seconds.`;
      }
      remainingTimeMessage = `<br>Remaning Duration: ${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`
      // CSS for the arrow icon
      var arrowStyle = document.createElement('style');
      arrowStyle.textContent = `
             .arrow-down {
                width: 0; 
                height: 0; 
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid #000; /* Arrow color */
                display: inline-block;
                margin-left: 5px;
                transition: transform 0.3s ease;
            }
            .arrow-up {
                transform: rotate(180deg);
            }
            .drop-button{
                margin-left: 10px;
                 background-color: transparent;
                  background-repeat: no-repeat;
                  border: none;
                  cursor: pointer;
                  overflow: hidden;
                  outline: none;		
    
            }
        `;
      document.head.appendChild(arrowStyle);
    
      // Create a button with an arrow icon
      var toggleButton = document.createElement('button');
      toggleButton.innerHTML = '<div class="arrow-down"></div>'; 
      toggleButton.classList.add("drop-button")
    
      // Create a container for the message
      var messageContainer = document.createElement('div');
      messageContainer.style.display = 'none'; 
      messageContainer.innerHTML = `<span style="font-size: small;">${totalLessonsMessage}</span>`;
      
      var remainingTimeMessageContainer = document.createElement('span');
      remainingTimeMessageContainer.style.fontSize = 'small';
      remainingTimeMessageContainer.classList.add("remaining-time");
      remainingTimeMessageContainer.innerHTML = remainingTimeMessage;
      messageContainer.appendChild(remainingTimeMessageContainer);
    
      // Add toggle functionality
      toggleButton.addEventListener('click', function() {
        messageContainer.style.display = messageContainer.style.display === 'none' ? 'block' : 'none';
        toggleButton.querySelector('.arrow-down').classList.toggle('arrow-up');
      });
    
      // Append the button and the message container to the title
      title.appendChild(toggleButton);
      title.appendChild(messageContainer);
    });
  
    $(document).ajaxSend(function(event, xhr, settings) {
      if (settings.type === 'GET') {    
        var newRemainingTime = calculateRemaningTime(document.querySelector('.next-lecture').parentNode.parentNode)
        let sectionTitleDiv = document.querySelector('.next-lecture').parentNode.previousElementSibling;
        let remainingTimeElement = sectionTitleDiv.querySelector('.remaining-time');
        remainingTimeElement.innerText = `<br>New Remaning Duration: ${newRemainingTime.hours} hours, ${newRemainingTime.minutes} minutes, ${newRemainingTime.seconds} seconds`
        
        }
    });
    