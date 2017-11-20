import React, { Component } from "react";
import HighCharts from "highcharts";
import ReactHighstock from "react-highcharts/ReactHighstock.src";
import {
  Image,
  Grid,
  Message,
  Icon,
  Loader,
  Input,
  Label,
  Table,
  Divider,
} from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchItemStat, fetchAdditionalItemStat } from "../actions/creators/items";
import HDVArchiveComponent from "../components/HDVArchiveComponent";
import ItemTooltipComponent from "../components/ItemTooltipComponent";
import _ from "lodash";

class ItemStatPage extends Component {
  state = {
    timestampSelected: -1,
    chartSizeValue: 100,
    recipeIngTotalAvgPrice: 0,
    recipeIngTotalActualPrice: 0,
  };
  extraButtons = [
    {
      type: "week",
      count: 1,
      text: "Week",
    },
    { type: "week", count: 4, text: "Month" },
    { type: "month", count: 12, text: "Year" },
  ];
  config = {
    chart: { type: "line", zoomType: "xy", height: 9 / 16 * this.state.chartSizeValue + "%" },
    title: { text: "PLACEHOLDER" },
    subtitle: {
      text: "Click and drag in the plot area to zoom in",
    },
    rangeSelector: {
      allButtonsEnabled: true,
      buttonTheme: {
        width: 100,
      },
      buttons: [],
      selected: 0,
    },
    legend: {
      enabled: true,
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      valueSuffix: " K/u",
      valueDecimals: 2,
    },
    navigator: { adaptToUpdatedData: false },
    xAxis: {
      type: "datetime",
      events: {
        setExtremes: e => {
          this.buttonClicked(e);
        },
      },
    },
    yAxis: { title: { text: "Prix en Kamas" }, min: 0 },
    plotOptions: {
      series: {
        showInNavigator: true,
        findNearestPointBy: "xy",
        cropThreshold: 5000,
        connectNulls: true,
        point: {
          events: {
            click: e => {
              this.pointClicked(e);
            },
          },
        },
      },
    },
    series: [
      {
        name: "x1",
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      },
    ],
  };

  pointClicked = e => {
    const selected = _.findIndex(this.props.prices, price => {
      return price.timestamp - e.point.x >= 0;
    });
    this.setState({ timestampSelected: selected });
  };

  buttonClicked = e => {
    if (e.rangeSelectorButton && this.props.prices.length > 0) {
      const first = _.first(this.props.prices).timestamp;
      const last = _.last(this.props.prices).timestamp;
      const range = e.rangeSelectorButton._range;
      const upTo = last - range;
      if (range && upTo < first) {
        this.props.onAdditionalLoad(
          this.props.match.params.itemId,
          range,
          first,
          last,
          this.onItemReceived,
        );
      }
    }
  };

  componentDidMount() {
    this.props.onMount(this.props.match.params.itemId, this.onItemReceived);
  }

  calculateAvgForPrice = (data, price, col, pow) => {
    let val = 0;
    _.each(price.itemDescriptions, desc => (val += parseInt(desc.prices[col], 10) / pow));
    val = val / price.itemDescriptions.length;
    data.push([price.timestamp, val > 0 ? val : null]);
  };

  onItemReceived = () => {
    const one = { name: "x1", data: [] };
    const ten = { name: "x10", data: [] };
    const hundred = { name: "x100", data: [] };
    const avg = { name: "Prix moyen", data: [] };
    _.each(this.props.prices, price => {
      this.calculateAvgForPrice(one.data, price, 0, 1);
      this.calculateAvgForPrice(ten.data, price, 1, 10);
      this.calculateAvgForPrice(hundred.data, price, 2, 100);
      avg.data.push([price.timestamp, price.averagePrice > 0 ? price.averagePrice : null]);
    });
    this.config.rangeSelector.buttons = [
      { type: "all", text: "All" },
      { type: "hour", count: 24, text: "24H" },
    ];
    if (this.props.dates.length > 2) {
      this.config.rangeSelector.buttons.push(this.extraButtons[0]);
    }
    if (this.props.dates.length > 7) {
      this.config.rangeSelector.buttons.push(this.extraButtons[1]);
    }
    if (this.props.dates.length > 30) {
      this.config.rangeSelector.buttons.push(this.extraButtons[2]);
    }
    this.config.series = [one, ten, hundred, avg];
    this.config.title.text = `Prix de l'objet: ${this.props.item.name}`;
    this.setState({ chartSizeValue: 100 });
  };

  computeAvgPrice = price => {
    if (price.length === 0 || price[0].averagePrice === -1) return 0;
    return price[0].averagePrice;
  };

  computeActualPrice = price => {
    if (price.length === 0) return 0;
    let avg = 0;
    _.each(price[0].itemDescriptions, desc => {
      let locAvg = 0;
      let cpt = 0;
      _.forEach(desc.prices, (descPrices, quant) => {
        if (descPrices !== 0) {
          locAvg += descPrices / Math.pow(10, quant);
          cpt++;
        }
      });
      avg += locAvg / cpt;
    });
    return Math.round(avg / price[0].itemDescriptions.length);
  };

  displayPrice = (price, quantity) => {
    if (price === 0) return "Indisponible";
    return Math.round(price * quantity).toLocaleString() + " K";
  };

  tooltipRender = ing => {
    return (
      <Table.Cell>
        <Image centered src={`/img/${ing.item.iconId}.png`} />
      </Table.Cell>
    );
  };

  displayRecipeInformations = () => {
    return (
      <Table>
        <Table.Row>
          {!this.props.loading &&
            this.displayIngredientsList(
              "Recipe",
              this.props.recipe.ingredients,
              ing => ing.item.s_ingredient.quantity,
            )}
        </Table.Row>
        <Table.Row>
          {!this.props.loading &&
            this.displayIngredientsList(
              "Recipe (All ingredients)",
              this.props.recipe.allIngredients,
              ing => ing.quantity,
            )}
        </Table.Row>
        <Table.Row>{!this.props.loading && this.displayUsedIn()}</Table.Row>
      </Table>
    );
  };

  displayUsedIn = () => {
    return (
      <div>
        <span style={{ fontSize: 20 }}>Used in these: </span>
        <p />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">Object</Table.HeaderCell>
              <Table.HeaderCell>Average Price</Table.HeaderCell>
              <Table.HeaderCell>Actual Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.recipe.usedIn.map((obj, i) => {
              const avg = this.computeAvgPrice(obj.price);
              const actual = this.computeActualPrice(obj.price);
              return (
                <Table.Row key={i}>
                  <ItemTooltipComponent
                    item={obj.item}
                    effects={obj.item.possibleEffects}
                    baseEffects={obj.item.possibleEffects}
                    avgPrices={obj.price}
                    key={i}
                    toRender={e => this.tooltipRender(obj)}
                    position="right center"
                  />
                  <Table.Cell>{obj.item.name}</Table.Cell>
                  <Table.Cell>{this.displayPrice(avg, 1)}</Table.Cell>
                  <Table.Cell>{this.displayPrice(actual, 1)}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  };

  displayIngredientsList = (title, ingredientList, getQuantity) => {
    let totalAvg = 0;
    let totalActual = 0;
    return (
      <div>
        <span style={{ fontSize: 20 }}>{title}</span>
        <p />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="3">Object</Table.HeaderCell>
              <Table.HeaderCell>Average Price</Table.HeaderCell>
              <Table.HeaderCell>Batch Average Price</Table.HeaderCell>
              <Table.HeaderCell>Actual Price</Table.HeaderCell>
              <Table.HeaderCell>Batch Actual Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {ingredientList.map((ing, i) => {
              const avg = this.computeAvgPrice(ing.price);
              const actual = this.computeActualPrice(ing.price);
              totalAvg += avg * getQuantity(ing);
              totalActual += actual * getQuantity(ing);
              return (
                <Table.Row key={i}>
                  <Table.Cell textAlign="center">{getQuantity(ing)}x</Table.Cell>
                  <ItemTooltipComponent
                    item={ing.item}
                    effects={ing.item.possibleEffects}
                    baseEffects={ing.item.possibleEffects}
                    avgPrices={ing.price}
                    key={i}
                    toRender={e => this.tooltipRender(ing)}
                    position="right center"
                  />
                  <Table.Cell>{ing.item.name}</Table.Cell>
                  <Table.Cell>{this.displayPrice(avg, 1)}</Table.Cell>
                  <Table.Cell>{this.displayPrice(avg, getQuantity(ing))}</Table.Cell>
                  <Table.Cell>{this.displayPrice(actual, 1)}</Table.Cell>
                  <Table.Cell>{this.displayPrice(actual, getQuantity(ing))}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan={4}>Total:</Table.HeaderCell>
              <Table.HeaderCell colSpan={2}>
                {Math.round(totalAvg).toLocaleString()} K
              </Table.HeaderCell>
              <Table.HeaderCell colSpan={1}>
                {Math.round(totalActual).toLocaleString()} K
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  };

  render() {
    const { item, prices } = this.props;
    return (
      <div>
        {this.props.errors.global && (
          <Message negative icon>
            <Icon name="warning sign" />
            <p>
              <Message.Header>Something went wrong: </Message.Header>
              <Message.Content>{this.props.errors.global}</Message.Content>
            </p>
          </Message>
        )}
        <Loader active={this.props.loading}>Loading</Loader>
        <div>
          <Grid divided padded columns={3}>
            <Grid.Row>
              <Grid.Column width={2}>
                {!this.props.loading && <Image centered src={`/img/${item.iconId}.png`} />}
              </Grid.Column>
              <Grid.Column width={5}>
                <h1>{item.name}</h1>
              </Grid.Column>
              <Grid.Column width={9}>
                {!this.props.loading && (
                  <h1>
                    {"Prix moyen: "}
                    {prices.length > 0
                      ? prices[prices.length - 1].averagePrice.toLocaleString() + " K"
                      : "Indisponible"}
                  </h1>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Label pointing="right">{"Chart's height"}</Label>
              <Input
                type="range"
                value={this.state.chartSizeValue}
                min={50}
                max={150}
                onChange={(e, data) => {
                  this.setState({ chartSizeValue: data.value });
                  this.config.chart.height = 9 / 16 * data.value + "%";
                }}
              />
            </Grid.Row>
          </Grid>
          {this.config.title.text !== "PLACEHOLDER" && (
            <div>
              <ReactHighstock config={this.config} />
              <br />
              <HDVArchiveComponent item={item} selected={this.state.timestampSelected} />
            </div>
          )}
          {!this.props.loading && this.displayRecipeInformations()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.itemStat.item || {},
    loading: state.itemStat.loading,
    errors: state.itemStat.errors,
    prices: state.itemStat.prices,
    dates: state.itemStat.dates,
    recipe: state.itemStat.recipe,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onMount: (itemId, onItemReceived) => {
      dispatch(fetchItemStat(itemId, onItemReceived));
    },
    onAdditionalLoad: (itemId, range, first, last, onItemReceived) => {
      dispatch(fetchAdditionalItemStat(itemId, range, first, last, onItemReceived));
    },
  };
};

ItemStatPage.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    iconId: PropTypes.number,
  }).isRequired,
  onMount: PropTypes.func.isRequired,
  onAdditionalLoad: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    global: PropTypes.string,
  }).isRequired,
  prices: PropTypes.array.isRequired,
  dates: PropTypes.array,
  recipe: PropTypes.shape({
    ingredients: PropTypes.array,
    usedIn: PropTypes.array,
    allIngredients: PropTypes.array,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemStatPage);
