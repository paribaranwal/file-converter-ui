import PDFConverter from './pdf-converter';
import ImageConverter from './image-converter';
export default [{
    title: 'PDF Converter',
    subTitle: 'Converts any file into PDF',
    description: 'Tool to convert any file into PDF file',
    linkName: 'PDF Converter',
    route: '/pdf-converter',
    active: true,
    component: PDFConverter
}, {
    title: 'Image Converter',
    subTitle: 'Converts any file into Image',
    description: 'Tool to convert any file into Image file',
    linkName: 'Image Converter',
    route: '/image-converter',
    active: false,
    component: ImageConverter
}];