import AssignmentIcon from '@material-ui/icons/Assignment';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

export const menuItems = [{
    label: 'Техническое задание',
    path: '/technicalTasks',
    icon: AssignmentIcon,
},{
    label: 'Пункты ТЗ',
    path: '/techPoints',
    icon: FormatListNumberedIcon,
},{
    label: 'Генерация акта',
    path: '/generateAct',
    icon: NoteAddIcon,
}]
