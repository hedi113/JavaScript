using Square.Views;

namespace Square
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();

            BindingContext = new CounterViewModel();
        }

    }
}
