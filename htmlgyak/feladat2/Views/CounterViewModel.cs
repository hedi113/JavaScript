using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Text;
using System.Windows.Input;

namespace Square.Views;

public class CounterViewModel : INotifyPropertyChanged
{
    public int Count1 { get; set; } = 0;
    public int Count2 { get; set; } = 0;
    public int Count3 { get; set; } = 0;
    public int Count4 { get; set; } = 0;
    public int Count5 { get; set; } = 0;
    public int Count6 { get; set; } = 0;
    public int Count7 { get; set; } = 0;
    public int Count8 { get; set; } = 0;
    public int Count9 { get; set; } = 0;
    public event PropertyChangedEventHandler PropertyChanged;

    public ICommand TopLeftButtonCommand { get; }
    public ICommand BottomLeftButtonCommand { get; }
    public ICommand TopRightButtonCommand { get; }

    public ICommand BottomRightButtonCommand { get; }

    public CounterViewModel()
    {
        TopLeftButtonCommand = new Command(() =>
        {
            Count1++;
            OnPropertyChanged("Count1");
            Count2++;
            OnPropertyChanged("Count2");
            Count4++;
            OnPropertyChanged("Count4");
            Count5++;
            OnPropertyChanged("Count5");
        });
        TopRightButtonCommand = new Command(() =>
        {
            Count2++;
            OnPropertyChanged("Count2");
            Count3++;
            OnPropertyChanged("Count3");
            Count5++;
            OnPropertyChanged("Count5");
            Count6++;
            OnPropertyChanged("Count6");
        });
        BottomLeftButtonCommand = new Command(() =>
        {
            Count4++;
            OnPropertyChanged(nameof(Count4));
            Count5++;
            OnPropertyChanged(nameof(Count5));
            Count7++;
            OnPropertyChanged(nameof(Count7));
            Count8++;
            OnPropertyChanged(nameof(Count8));
        });
        BottomRightButtonCommand = new Command(() =>
        {
            Count5++;
            OnPropertyChanged("Count5");
            Count6++;
            OnPropertyChanged("Count6");
            Count8++;
            OnPropertyChanged("Count8");
            Count9++;
            OnPropertyChanged("Count9");
        });
    }
    public void OnPropertyChanged([CallerMemberName] string name = "") =>
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
