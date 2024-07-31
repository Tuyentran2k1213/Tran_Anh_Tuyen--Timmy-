import { FC, memo, useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Flex,
  Form,
  InputNumber,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { fetchTokenList } from "../apis/getAllToken";
import { TokenData, TokenListFields } from "../models/token.models";
import { getExchangeRate } from "../utils/getExchangeRate";

const { Option } = Select;

const CurrencySwapForm: FC = () => {
  const [form] = Form.useForm();
  const [tokenList, setTokenList] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCalculate, setLoadingCalculate] = useState<boolean>(false);
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const from = Form.useWatch("from", form);
  const to = Form.useWatch("to", form);

  const fromData = useMemo(() => JSON.parse(from ?? "{}") as TokenData, [from]);
  const toData = useMemo(() => JSON.parse(to ?? "{}") as TokenData, [to]);

  useEffect(() => {
    setLoading(true);
    fetchTokenList()
      .then((data) => setTokenList(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleExchangeRate = debounce((_: unknown, values: TokenListFields) => {
    if (!values.from || !values.to || !values.fromAmount) return;
    setLoadingCalculate(true);
    setTimeout(() => {
      const exchangeRateData = getExchangeRate(
        values.from,
        values.to
      ) as number;
      setExchangeRate(exchangeRateData);

      form.setFieldValue(
        "toAmount",
        (values.fromAmount * exchangeRateData).toFixed(5)
      );
      setLoadingCalculate(false);
    }, 2000);
  }, 500);

  const handleSwapExchange = () => {
    let fromAmount = form.getFieldValue("fromAmount");
    let toAmount = form.getFieldValue("toAmount");
    const fromValues = form.getFieldValue("from");
    const toValues = form.getFieldValue("to");

    const exchangeRateData = getExchangeRate(toValues, fromValues) as number;

    if (!fromAmount || !toAmount) {
      fromAmount = null;
      toAmount = null;
    } else setExchangeRate(exchangeRateData);

    form.setFieldsValue({
      to: fromValues,
      from: toValues,
      fromAmount: toAmount,
      toAmount: fromAmount,
    });
  };

  return (
    <Form
      style={{ border: "1px solid #e6dbdb", padding: 16, borderRadius: 8 }}
      form={form}
      onValuesChange={handleExchangeRate}
      layout="vertical"
      wrapperCol={{ span: 23 }}
    >
      <Row>
        <Col span={12}>
          <Form.Item
            label="From"
            name="from"
            rules={[{ required: true, message: "Please select token" }]}
          >
            <Select loading={loading} showSearch>
              {tokenList.map((token: TokenData, index: number) => (
                <Option
                  key={token.currency + index}
                  value={JSON.stringify(token ?? "{}")}
                >
                  <Flex gap={8}>
                    <img src={token.icon} alt={token.currency} />
                    <span>{token.currency}</span>
                  </Flex>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Amount"
            name="fromAmount"
            rules={[{ required: true, message: "Please give amount" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handleSwapExchange} shape="circle">
            <SwapOutlined
              style={{ transform: "rotate(90deg)", width: "100%" }}
            />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label="To"
            name="to"
            rules={[{ required: true, message: "Please select token" }]}
          >
            <Select loading={loading} showSearch>
              {tokenList.map((token: TokenData, index: number) => (
                <Option
                  key={token.currency + token.date + index}
                  value={JSON.stringify(token ?? "{}")}
                >
                  <Flex gap={8}>
                    <img src={token.icon} alt={token.currency} />
                    <span>{token.currency}</span>
                  </Flex>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Spin spinning={loadingCalculate} tip="Calculating...">
            <Form.Item label="Amount" name="toAmount">
              <InputNumber disabled style={{ width: "100%" }} />
            </Form.Item>
          </Spin>
        </Col>
      </Row>
      {!!exchangeRate && (
        <Flex justify="space-between" gap={8}>
          <Typography.Text type="secondary">Exchange Rate: </Typography.Text>
          <Typography.Text type="secondary">
            1 {fromData.currency} = {exchangeRate} {toData.currency}
          </Typography.Text>
        </Flex>
      )}
    </Form>
  );
};

export default memo(CurrencySwapForm);
