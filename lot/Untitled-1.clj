




futures
(
    (futures
        (
            [=-1] 30 minute close - [=1] 30 minute open / [=-1] 30 minute close > 0.02 and
            [=1] 30 minute high < [=1] 30 minute lower bollinger band( 20,2) and
            [=2] 30 minute close > [=2] 30 minute vwap
        )
    )
    or
    (futures
        (
            [=1] 30 minute open - [=-1] 30 minute close / [=-1] 30 minute close> .02 and
            [=1] 30 minute low > [=1] 30 minute upper bollinger band( 20, 2) and
            [=2] 30 minute close < [=2] 30 minute vwap
        )
    )
    or
    (futures
        (
            (futures
                (
                    [=-1] 15 minute close - [=1] 15 minute open / [=-1] 15 minute
                    close >0.02 and [=1] 15 minute high < [=1] 15 minute lower
                    bollinger band( 20, 2) and [=2] 15 minute close > [=2] 15 minute
                    vwap
                )
            )
            or
            (futures
                (
                    [=1] 15 minute open - [=-1] 15 minute close
                    / [=-1] 15 minute close > .02 and [=1] 15 minute low > [=1] 15
                    minute upper bollinger band( 20,2) and [=2] 15 minute close <
                    [=2] 15 minute vwap
                )
            )
        )
    )
)
