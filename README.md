# Roadmap of tasks

This application shows notes organized by categories on a timeline.

## Useful Links

[Live demo](https://lucian-cristian-toma.developerakademie.com)

[Documentation (Compodoc)](https://lucian-cristian-toma.developerakademie.com/roadmap-documentation)

## Project description

This project is developed using Angular, Angular Material, Compodoc for documentation.

**Toolbar**

The application has a toolbar with Label filtering option, Calendar Week selector and Theme switch eg. Light or Dark mode.

**Grid with notes**

The aplication data is shown on a 5x3 grid for five workdays(just workdays are shown) and three departments, every note is shown at it's coresponding day and has it's length based on the duration.

eg. if duration is 2 day's the card will take two columns. The note are focusable on hover eg. when the bottom stacked note is hovered will apear on top of the stack.

**Notes**

Every note will show a detailed view when clicked, in the dialog we have an option to edit the note, data such as Title, Summary, Start date, End date, Labels(departments) can be changed and saved or deleted(confirmation needed to delete).

**Data fetch and processing**

The data is fetched with a GET Request on Notes Endpoint, then the response is stored in a variable where all the notes are stored and it's data is mapped to it's coresponding day in a new variable, the edited/deleted notes are updated variable where all the notes are stored and then the mapping function will be fired again to update the UI.

**Responsive design**

The size of the Table and Notes is updated based on the screen width and height and under 800px width or 1000px the Table has fixed Width and Height and can be scrolled to see the oveflowing content.

**Theme switch**

The UI theme can be changed by clicking on the switch top right corner.

**Labels filter(Departments)**

The UI offers a Label filtering top left corner by selecting an option and based on that selection the table will show just the selected option or all labels.

## Basic requirements

- Fetch notes & label data from given endpoints
- Display notes, grouped by labels, in a workdays-based weekly overview
- Offer a filter function for labels
- Notes are editable via a dialog

  - changed data should be reflected on cards & board (example: changed start date)
  - Input validation for the summary
    - max length 250

## User Interface

- Display a workdays-based weekly view for notes - Offered function in the top row: a week switch & filter option for labels
- Display label-based rows (based on selected filter) and their notes
- Card design/details:
  - Normal Card contain note Id, title, summary, startDate, duration
  - Small cards contain note Id, title, summary with just two lines (dotted out)
- Stacking/overlapping should be solved through overlapping to avoid scrollbars
- On hover a card will be highlighted on top (stacking) + show full summary for small cards
- Clicking on a card opens the edit dialog o possible edit fields: Summary, start date, duration, labels, title
  - Buttons: Save & cancel
- Scrollbars
  - Vertical: no scrollbar above >=800px height (including possible stacked notes)
  - Horizontal: no horizontal scrollbar >= 1000px width

## Optional challenges

- Editable: Save a changed data at the right endpoint and replace updated data in the frontend data (it is a dummy save endpoint – no real saving/manipulation action!)
- Show label: display note labels inside the card
- Deleteable: Delete notes via a button and frontend wise reflected
- Dark mode: offer a UI dark mode

Just the requierments that are met are writen here.
